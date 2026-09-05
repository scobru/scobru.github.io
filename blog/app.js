import ZEN from './zen.min.js';
import { renderMarkdown } from './markdown.js';

// Configuration
const RELAY_URL = 'https://delay.scobrudot.dev/zen';
const DEFAULT_SALT_PREFIX = 'scobru:zen:blog:';
const DEFAULT_AUTHOR_PUB = '0E2ktahyK9Ngm8bocvimGuKnOVIba3lNA7451zGqcfwn1';

// State
let zen = null;
let currentPair = null;
let currentUsername = null;
let authorPub = null;
let postsMap = new Map();
let currentViewPostId = null;
let isPreviewing = false;
let editingPostId = null;

// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const themeText = document.getElementById('theme-text');
const loginTriggerBtn = document.getElementById('login-trigger');
const newPostBtn = document.getElementById('new-post-btn');
const authControls = document.getElementById('auth-controls');
const authorBadge = document.getElementById('author-badge');
const logoutBtn = document.getElementById('logout-btn');
const relayStatusDot = document.getElementById('relay-dot');
const relayStatusText = document.getElementById('relay-text');
const footerStatus = document.getElementById('footer-status');

const listView = document.getElementById('list-view');
const singleView = document.getElementById('single-view');
const postsContainer = document.getElementById('posts-container');
const emptyState = document.getElementById('empty-state');

// Modals
const authModal = document.getElementById('auth-modal');
const authForm = document.getElementById('auth-form');
const authUser = document.getElementById('auth-user');
const authPass = document.getElementById('auth-pass');
const authAlert = document.getElementById('auth-alert');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const authCancelBtn = document.getElementById('auth-cancel-btn');

const editorModal = document.getElementById('editor-modal');
const editorForm = document.getElementById('editor-form');
const editorModalTitle = document.getElementById('editor-modal-title');
const postTitleInput = document.getElementById('post-title');
const postTagsInput = document.getElementById('post-tags');
const postContentInput = document.getElementById('post-content');
const editorPreview = document.getElementById('editor-preview');
const tabWriteBtn = document.getElementById('tab-write');
const tabPreviewBtn = document.getElementById('tab-preview');
const editorCancelBtn = document.getElementById('editor-cancel-btn');
const editorSubmitBtn = document.getElementById('editor-submit-btn');

const toastEl = document.getElementById('toast');

// --- Helper Utilities ---

function showToast(message, duration = 3000) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => {
    toastEl.classList.remove('show');
  }, duration);
}

function formatDate(ts) {
  if (!ts) return '';
  const date = new Date(ts);
  return date.toISOString().slice(0, 10);
}

function getWordCount(text) {
  if (!text) return 0;
  return text.trim().split(/\s+/).length;
}

function getReadingTime(text) {
  const words = getWordCount(text);
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

// --- Theme Management ---

function getCurrentTheme() {
  const saved = localStorage.getItem('theme');
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme, save = false) {
  document.documentElement.setAttribute('data-theme', theme);
  if (save) {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }
  if (themeText) {
    themeText.textContent = theme === 'dark' ? '[ light ]' : '[ dark ]';
  }
}

// --- Cryptographic Keypair Derivation ---

async function derivePair(username, password) {
  const cleanUser = username.trim().toLowerCase();
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(DEFAULT_SALT_PREFIX + cleanUser),
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256
  );
  const seed = Array.from(new Uint8Array(bits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return await ZEN.pair(null, { seed });
}

// --- Zen Initialization & Relay Connectivity ---

function initZen() {
  try {
    zen = new ZEN({
      peers: [RELAY_URL],
      localStorage: false,
      radisk: true,
      axe: true
    });

    window.zen = zen;

    // Relay status detection
    updateRelayStatus(false);
    
    zen.on('hi', () => {
      updateRelayStatus(true);
    });

    // Check wire status periodically
    setInterval(() => {
      try {
        const root = zen._graph && zen._graph._;
        const peers = (root && root.opt && root.opt.peers) || {};
        const isConnected = Object.values(peers).some(
          p => p && p.wire && (p.wire.readyState === 1 || p.wire.readyState === undefined)
        );
        updateRelayStatus(isConnected);
      } catch (e) {}
    }, 5000);

  } catch (err) {
    console.error('Failed to initialize Zen:', err);
    updateRelayStatus(false);
  }
}

function updateRelayStatus(online) {
  if (relayStatusDot) {
    if (online) {
      relayStatusDot.classList.add('online');
    } else {
      relayStatusDot.classList.remove('online');
    }
  }
  if (relayStatusText) {
    relayStatusText.textContent = online ? 'online' : 'connecting';
  }
}

// --- Subscription to Author Userspace ---

let activeSubscription = null;

function subscribeToAuthor(pub) {
  if (!pub) return;
  authorPub = pub;
  localStorage.setItem('zen_blog_author_pub', pub);

  // Clear existing items
  postsMap.clear();
  renderPostsList();

  // Subscribe to author's posts namespace
  zen.get('~' + pub).get('posts').map().on((post, id) => {
    if (!post || post.deleted === true) {
      postsMap.delete(id);
    } else {
      postsMap.set(id, {
        id: post.id || id,
        title: post.title || 'Untitled',
        content: post.content || '',
        tags: Array.isArray(post.tags) ? post.tags : (post.tags ? String(post.tags).split(',').map(t => t.trim()) : []),
        createdAt: post.createdAt || post.date || Date.now(),
        updatedAt: post.updatedAt || post.createdAt || Date.now(),
        authorPub: pub
      });
    }

    if (currentViewPostId && currentViewPostId === id) {
      renderSinglePost(currentViewPostId);
    } else {
      renderPostsList();
    }
  });

  // Verify pub registration
  zen.get('~' + pub).get('pub').once((val) => {
    if (val) {
      console.log('Author namespace confirmed on relay:', pub);
    }
  });
}

// --- CRUD Operations ---

async function createPost(title, content, tags) {
  if (!currentPair) throw new Error('Not authenticated');

  const id = 'post-' + Date.now();
  const tagList = Array.isArray(tags) ? tags.map(t => t.trim()).filter(Boolean) : [];
  const postData = {
    id: id,
    title: title.trim(),
    content: content.trim(),
    tags: tagList.join(', '),
    createdAt: Date.now(),
    updatedAt: Date.now(),
    deleted: false
  };

  return new Promise((resolve, reject) => {
    zen.get('~' + currentPair.pub).get('posts').get(id).put(
      postData,
      ack => {
        if (ack && ack.err) {
          reject(new Error(ack.err));
        } else {
          // Immediately update local map for instant feedback
          postsMap.set(id, { ...postData, tags: tagList, authorPub: currentPair.pub });
          renderPostsList();
          resolve(postData);
        }
      },
      { authenticator: currentPair }
    );
  });
}

async function updatePost(id, title, content, tags) {
  if (!currentPair) throw new Error('Not authenticated');

  const existing = postsMap.get(id);
  const tagList = Array.isArray(tags) ? tags.map(t => t.trim()).filter(Boolean) : [];
  const postData = {
    id: id,
    title: title.trim(),
    content: content.trim(),
    tags: tagList.join(', '),
    createdAt: existing ? existing.createdAt : Date.now(),
    updatedAt: Date.now(),
    deleted: false
  };

  return new Promise((resolve, reject) => {
    zen.get('~' + currentPair.pub).get('posts').get(id).put(
      postData,
      ack => {
        if (ack && ack.err) {
          reject(new Error(ack.err));
        } else {
          postsMap.set(id, { ...postData, tags: tagList, authorPub: currentPair.pub });
          if (currentViewPostId === id) {
            renderSinglePost(id);
          } else {
            renderPostsList();
          }
          resolve(postData);
        }
      },
      { authenticator: currentPair }
    );
  });
}

async function deletePost(id) {
  if (!currentPair) throw new Error('Not authenticated');

  const confirmDelete = confirm('Are you sure you want to delete this post from the Zen graph?');
  if (!confirmDelete) return;

  const existing = postsMap.get(id);
  const tombstone = {
    id: id,
    deleted: true,
    title: '',
    content: '',
    updatedAt: Date.now()
  };

  return new Promise((resolve, reject) => {
    zen.get('~' + currentPair.pub).get('posts').get(id).put(
      tombstone,
      ack => {
        if (ack && ack.err) {
          reject(new Error(ack.err));
        } else {
          postsMap.delete(id);
          showToast('Post deleted.');
          if (currentViewPostId === id) {
            navigateTo('/');
          } else {
            renderPostsList();
          }
          resolve();
        }
      },
      { authenticator: currentPair }
    );
  });
}

// --- Render Views ---

function renderPostsList() {
  if (currentViewPostId) return;

  const posts = Array.from(postsMap.values())
    .filter(p => !p.deleted)
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  if (footerStatus) {
    footerStatus.textContent = `// ${posts.length} post${posts.length === 1 ? '' : 's'} indexed · system: online`;
  }

  if (posts.length === 0) {
    postsContainer.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  }

  emptyState.style.display = 'none';
  postsContainer.innerHTML = posts.map(post => {
    const isOwner = currentPair && post.authorPub === currentPair.pub;
    const dateStr = formatDate(post.createdAt);
    const readingTime = getReadingTime(post.content);
    
    // Create excerpt from plain text
    const plain = post.content.replace(/[#*`_~>[\]()]/g, '').slice(0, 160);
    const excerpt = plain.length >= 160 ? plain + '...' : plain;

    const tagsHtml = (post.tags || [])
      .map(t => `<span class="status-badge badge-tag">#${t}</span>`)
      .join(' ');

    const ownerControls = isOwner ? `
      <div class="post-actions">
        <button class="bracket-btn edit-btn" data-id="${post.id}">[ edit ]</button>
        <button class="bracket-btn btn-danger delete-btn" data-id="${post.id}">[ delete ]</button>
      </div>
    ` : '';

    return `
      <li class="post-item" id="item-${post.id}">
        <div class="post-meta-row">
          <span>${dateStr} · ${readingTime}</span>
          ${isOwner ? '<span class="status-badge" style="border-color: #16a34a; color: #15803d;">AUTHOR</span>' : ''}
        </div>
        <h3 class="post-title">
          <a href="?post=${encodeURIComponent(post.id)}" data-nav="${post.id}">${post.title}</a>
        </h3>
        <p class="post-excerpt">${excerpt}</p>
        <div class="post-footer-row">
          <div class="post-tags">${tagsHtml}</div>
          ${ownerControls}
        </div>
      </li>
    `;
  }).join('');

  // Attach event listeners for post links & actions
  postsContainer.querySelectorAll('a[data-nav]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const postId = el.getAttribute('data-nav');
      navigateTo(`?post=${encodeURIComponent(postId)}`);
    });
  });

  postsContainer.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.getAttribute('data-id');
      openEditModal(postId);
    });
  });

  postsContainer.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const postId = btn.getAttribute('data-id');
      deletePost(postId);
    });
  });
}

function renderSinglePost(postId) {
  const post = postsMap.get(postId);
  if (!post || post.deleted) {
    singleView.innerHTML = `
      <div class="empty-state">
        <p>// Post "${postId}" not found or deleted from Zen graph.</p>
        <a href="." class="bracket-btn" id="back-to-list">[ ← back to posts ]</a>
      </div>
    `;
    singleView.querySelector('#back-to-list')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('.');
    });
    return;
  }

  const isOwner = currentPair && post.authorPub === currentPair.pub;
  const dateStr = formatDate(post.createdAt);
  const updatedStr = post.updatedAt && post.updatedAt !== post.createdAt ? ` · updated ${formatDate(post.updatedAt)}` : '';
  const readingTime = getReadingTime(post.content);
  const renderedContent = renderMarkdown(post.content);

  const tagsHtml = (post.tags || [])
    .map(t => `<span class="status-badge badge-tag">#${t}</span>`)
    .join(' ');

  singleView.innerHTML = `
    <div style="margin-bottom: 20px;">
      <a href="." class="bracket-btn" id="back-link">[ ← all posts ]</a>
    </div>
    <article class="single-post-article">
      <header class="single-post-header">
        <div class="single-post-meta">
          <span>${dateStr}${updatedStr}</span>
          <span>·</span>
          <span>${readingTime}</span>
          <span>·</span>
          <span title="Author Public Key">~${post.authorPub ? post.authorPub.slice(0, 10) + '...' : 'zen'}</span>
        </div>
        <h1 class="single-post-title">${post.title}</h1>
        <div class="post-footer-row">
          <div class="post-tags">${tagsHtml}</div>
          <div class="post-actions">
            <button class="bracket-btn" id="copy-link-btn">[ copy permalink ]</button>
            ${isOwner ? `
              <button class="bracket-btn" id="single-edit-btn">[ edit ]</button>
              <button class="bracket-btn btn-danger" id="single-delete-btn">[ delete ]</button>
            ` : ''}
          </div>
        </div>
      </header>
      <div class="post-content">
        ${renderedContent}
      </div>
    </article>
  `;

  // Attach single view listeners
  singleView.querySelector('#back-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('.');
  });

  singleView.querySelector('#copy-link-btn')?.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Permalink copied to clipboard.');
  });

  if (isOwner) {
    singleView.querySelector('#single-edit-btn')?.addEventListener('click', () => {
      openEditModal(postId);
    });
    singleView.querySelector('#single-delete-btn')?.addEventListener('click', () => {
      deletePost(postId);
    });
  }
}

// --- Routing & Navigation ---

function handleRoute() {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get('post');
  const authorParam = params.get('author');

  if (authorParam && authorParam !== authorPub) {
    subscribeToAuthor(authorParam);
  }

  if (postId) {
    currentViewPostId = postId;
    listView.style.display = 'none';
    singleView.style.display = 'block';
    renderSinglePost(postId);
    window.scrollTo(0, 0);
  } else {
    currentViewPostId = null;
    listView.style.display = 'block';
    singleView.style.display = 'none';
    renderPostsList();
  }
}

function navigateTo(url) {
  window.history.pushState({}, '', url);
  handleRoute();
}

window.addEventListener('popstate', handleRoute);

// --- Authentication Flow ---

function updateAuthUI() {
  if (currentPair) {
    loginTriggerBtn.style.display = 'none';
    authControls.style.display = 'inline-flex';
    newPostBtn.style.display = 'inline-flex';
    authorBadge.textContent = `[ author: ${currentUsername} (~${currentPair.pub.slice(0, 6)}) ]`;
  } else {
    loginTriggerBtn.style.display = 'inline-flex';
    authControls.style.display = 'none';
    newPostBtn.style.display = 'none';
  }
}

async function handleLogin(username, password) {
  authAlert.style.display = 'none';
  authSubmitBtn.textContent = '[ deriving pair... ]';
  authSubmitBtn.disabled = true;

  try {
    const pair = await derivePair(username, password);
    currentPair = pair;
    currentUsername = username;

    // Register identity on graph
    zen.get('~' + pair.pub).get('pub').put(pair.pub, null, { authenticator: pair });

    // Store in session storage for refreshing convenience
    sessionStorage.setItem('zen_blog_user', username);
    sessionStorage.setItem('zen_blog_pass', password);

    // Subscribe to own userspace
    subscribeToAuthor(pair.pub);

    updateAuthUI();
    closeAuthModal();
    showToast(`Authenticated as ${username}.`);
  } catch (err) {
    console.error('Authentication error:', err);
    authAlert.textContent = `Auth error: ${err.message}`;
    authAlert.style.display = 'block';
  } finally {
    authSubmitBtn.textContent = '[ authenticate ]';
    authSubmitBtn.disabled = false;
  }
}

function handleLogout() {
  currentPair = null;
  currentUsername = null;
  sessionStorage.removeItem('zen_blog_user');
  sessionStorage.removeItem('zen_blog_pass');
  updateAuthUI();
  subscribeToAuthor(DEFAULT_AUTHOR_PUB);
  showToast('Logged out.');
}

function openAuthModal() {
  authAlert.style.display = 'none';
  authForm.reset();
  authModal.classList.add('is-open');
  authUser.focus();
}

function closeAuthModal() {
  authModal.classList.remove('is-open');
}

// --- Editor Flow ---

function openCreateModal() {
  editingPostId = null;
  editorModalTitle.textContent = '[ + new post ]';
  editorForm.reset();
  setEditorTab('write');
  editorModal.classList.add('is-open');
  postTitleInput.focus();
}

function openEditModal(postId) {
  const post = postsMap.get(postId);
  if (!post) return;

  editingPostId = postId;
  editorModalTitle.textContent = `[ edit post: ${post.title} ]`;
  postTitleInput.value = post.title || '';
  postTagsInput.value = (post.tags || []).join(', ');
  postContentInput.value = post.content || '';
  setEditorTab('write');
  editorModal.classList.add('is-open');
  postTitleInput.focus();
}

function closeEditorModal() {
  editorModal.classList.remove('is-open');
}

function setEditorTab(tab) {
  if (tab === 'preview') {
    isPreviewing = true;
    tabPreviewBtn.style.backgroundColor = 'var(--link-hover-bg)';
    tabPreviewBtn.style.color = 'var(--link-hover-color)';
    tabWriteBtn.style.backgroundColor = 'transparent';
    tabWriteBtn.style.color = 'var(--text-color)';
    postContentInput.style.display = 'none';
    editorPreview.style.display = 'block';
    editorPreview.innerHTML = renderMarkdown(postContentInput.value || '*No content to preview*');
  } else {
    isPreviewing = false;
    tabWriteBtn.style.backgroundColor = 'var(--link-hover-bg)';
    tabWriteBtn.style.color = 'var(--link-hover-color)';
    tabPreviewBtn.style.backgroundColor = 'transparent';
    tabPreviewBtn.style.color = 'var(--text-color)';
    postContentInput.style.display = 'block';
    editorPreview.style.display = 'none';
  }
}

// --- Initialization & Event Bindings ---

function setupEventListeners() {
  // Theme toggle
  themeToggleBtn?.addEventListener('click', () => {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light', false);
    }
  });

  // Auth triggers
  loginTriggerBtn?.addEventListener('click', openAuthModal);
  authCancelBtn?.addEventListener('click', closeAuthModal);
  logoutBtn?.addEventListener('click', handleLogout);

  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = authUser.value.trim();
    const p = authPass.value;
    if (!u || !p) return;
    handleLogin(u, p);
  });

  // Editor triggers
  newPostBtn?.addEventListener('click', openCreateModal);
  editorCancelBtn?.addEventListener('click', closeEditorModal);
  tabWriteBtn?.addEventListener('click', () => setEditorTab('write'));
  tabPreviewBtn?.addEventListener('click', () => setEditorTab('preview'));

  editorForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = postTitleInput.value.trim();
    const content = postContentInput.value.trim();
    const tags = postTagsInput.value.split(',').map(t => t.trim()).filter(Boolean);

    if (!title || !content) {
      alert('Please provide both title and content.');
      return;
    }

    editorSubmitBtn.textContent = '[ publishing... ]';
    editorSubmitBtn.disabled = true;

    try {
      if (editingPostId) {
        await updatePost(editingPostId, title, content, tags);
        showToast('Post updated.');
      } else {
        await createPost(title, content, tags);
        showToast('Post published.');
      }
      closeEditorModal();
    } catch (err) {
      console.error('Save post error:', err);
      alert('Failed to save post: ' + err.message);
    } finally {
      editorSubmitBtn.textContent = '[ publish post ]';
      editorSubmitBtn.disabled = false;
    }
  });

  // Close modals on clicking backdrop
  [authModal, editorModal].forEach(modal => {
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('is-open');
      }
    });
  });

  // Esc key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAuthModal();
      closeEditorModal();
    }
  });
}

// Bootstrap
(async function init() {
  applyTheme(getCurrentTheme(), false);
  setupEventListeners();
  initZen();

  // Check saved session or author pub
  const savedUser = sessionStorage.getItem('zen_blog_user');
  const savedPass = sessionStorage.getItem('zen_blog_pass');
  if (savedUser && savedPass) {
    await handleLogin(savedUser, savedPass);
  } else {
    // If not authenticated, subscribe to URL author param or default author pub
    const params = new URLSearchParams(window.location.search);
    const authorParam = params.get('author');
    const targetAuthor = authorParam || DEFAULT_AUTHOR_PUB;

    subscribeToAuthor(targetAuthor);
  }

  handleRoute();
})();

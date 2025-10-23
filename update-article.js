// Script to update article content from markdown file
const fs = require('fs');
const path = require('path');

function updateArticle() {
    try {
        // Read the markdown file
        const markdownPath = path.join(__dirname, 'articles', 'latest.md');
        const markdownContent = fs.readFileSync(markdownPath, 'utf8');
        
        // Escape the content for JavaScript
        const escapedContent = markdownContent
            .replace(/\\/g, '\\\\')
            .replace(/`/g, '\\`')
            .replace(/\$/g, '\\$');
        
        // Read the blog.html file
        const blogPath = path.join(__dirname, 'blog.html');
        let blogContent = fs.readFileSync(blogPath, 'utf8');
        
        // Find and replace the article content
        const startMarker = 'return `# The Future of Decentralized Technology';
        const endMarker = 'visit our [development section](dev.html).*`;';
        
        const startIndex = blogContent.indexOf(startMarker);
        const endIndex = blogContent.indexOf(endMarker) + endMarker.length;
        
        if (startIndex !== -1 && endIndex !== -1) {
            const newContent = `return \`${escapedContent}\`;`;
            blogContent = blogContent.substring(0, startIndex) + newContent + blogContent.substring(endIndex);
            
            // Write the updated file
            fs.writeFileSync(blogPath, blogContent);
            console.log('✅ Article content updated successfully!');
        } else {
            console.log('❌ Could not find article content markers in blog.html');
        }
        
    } catch (error) {
        console.log('❌ Error updating article:', error.message);
    }
}

// Run the update
updateArticle();

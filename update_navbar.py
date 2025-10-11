import os
import re

# Define the directory containing HTML files
html_dir = r'd:\Users\viora brand'

# Pattern to find the login link
login_pattern = r'(<a\s+class=[\"\']nav-link[\"\']\s+href=[\"\']login\.html[\"\'][^>]*>)(<i[^>]*>.*?<\/i>)?\s*(Login)?\s*<\/a>'

# Replacement with login/register links
replacement = '''<div class="d-flex align-items-center">
                <a class="nav-link me-2" href="login.html">\2\3</a>
                <span class="text-white">/</span>
                <a class="nav-link ms-2" href="register.html">Register</a>
            </div>'''

# Iterate through all HTML files in the directory
for filename in os.listdir(html_dir):
    if filename.endswith('.html') and filename != 'register.html':
        filepath = os.path.join(html_dir, filename)
        
        try:
            # Read the file content
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace the login link with login/register links
            new_content = re.sub(login_pattern, replacement, content, flags=re.IGNORECASE | re.DOTALL)
            
            # Write the updated content back to the file
            with open(filepath, 'w', encoding='utf-8', newline='\n') as file:
                file.write(new_content)
            
            print(f'Updated: {filename}')
            
        except Exception as e:
            print(f'Error processing {filename}: {str(e)}')

print('Navigation bar update complete!')

// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const todoItemTemplate = document.getElementById('todoItemTemplate');

// Add event listener for the Add button
addBtn.addEventListener('click', addTodo);

// Also add event listener for Enter key in input field
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Function to add new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    
    // Don't add empty todos
    if (todoText === '') {
        return;
    }

    // Create new todo item from template
    const todoItem = createTodoItem(todoText);
    
    // Add to list
    todoList.appendChild(todoItem);
    
    // Clear input
    todoInput.value = '';
}

// Function to create todo item
function createTodoItem(text) {
    // Clone the template content
    const todoItem = todoItemTemplate.content.cloneNode(true);
    const li = todoItem.querySelector('li');
    const span = todoItem.querySelector('.todo-text');
    const editBtn = todoItem.querySelector('.editBtn');
    const deleteBtn = todoItem.querySelector('.deleteBtn');
    
    // Set the text content
    span.textContent = text;
    
    // Add delete functionality
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });
    
    // Add edit functionality
    editBtn.addEventListener('click', () => {
        const isEditing = li.classList.contains('editing');
        
        if (!isEditing) {
            // Switch to edit mode
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            input.className = 'edit-input';
            span.style.display = 'none';
            li.insertBefore(input, editBtn);
            editBtn.textContent = 'Save';
            li.classList.add('editing');
            
            // Focus the input
            input.focus();
            
            // Add event listener for Enter key
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEdit(li, span, input, editBtn);
                }
            });
        } else {
            // Save the edit
            const input = li.querySelector('.edit-input');
            saveEdit(li, span, input, editBtn);
        }
    });
    
    return todoItem;
}

// Function to save edit
function saveEdit(li, span, input, editBtn) {
    const newText = input.value.trim();
    
    if (newText !== '') {
        span.textContent = newText;
        span.style.display = '';
        input.remove();
        editBtn.textContent = 'Edit';
        li.classList.remove('editing');
    }
}

// Add some CSS for edit input
const style = document.createElement('style');
style.textContent = `
    .edit-input {
        flex: 1;
        padding: 5px;
        margin-right: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
`;
document.head.appendChild(style); 
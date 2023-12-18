const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#startButton');
const shortBreakButton = document.querySelector('#shortBreakButton');
const longBreakButton = document.querySelector('#longBreakButton');
const resetButton = document.querySelector('#resetButton');
const tasksList = document.getElementById('tasks');
const newTaskInput = document.getElementById('newTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const completedSessionsElement = document.getElementById('completedSessions');
const workDurationInput = document.getElementById('workDuration');
const shortBreakDurationInput = document.getElementById('shortBreakDuration');
const longBreakDurationInput = document.getElementById('longBreakDuration');

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startTimer(type) {
    let duration;
    switch (type) {
        case 'work':
            duration = parseInt(workDurationInput.value, 10) * 60;
            break;
        case 'shortBreak':
            duration = parseInt(shortBreakDurationInput.value, 10) * 60;
            break;
        case 'longBreak':
            duration = parseInt(longBreakDurationInput.value, 10) * 60;
            break;
        default:
            duration = 1500; // Default to 25 minutes
    }
    chrome.runtime.sendMessage({ action: 'startTimer', duration, type });
}

startButton.addEventListener('click', () => startTimer('work'));
shortBreakButton.addEventListener('click', () => startTimer('shortBreak'));
longBreakButton.addEventListener('click', () => startTimer('longBreak'));

resetButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'resetTimer' });
    updateDisplay(1500); // Resets to default 25 minutes
});

function loadTasks() {
    chrome.storage.sync.get(['tasks'], (data) => {
        tasksList.innerHTML = '';
        (data.tasks || []).forEach(taskText => {
            const listItem = document.createElement('li');
            listItem.textContent = taskText;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function() {
                listItem.remove();
                saveTasks();
            });
            listItem.appendChild(removeButton);
            tasksList.appendChild(listItem);
        });
    });
}

function saveTasks() {
    const tasks = [];
    tasksList.querySelectorAll('li').forEach(taskItem => {
        tasks.push(taskItem.textContent.replace('Remove', '').trim());
    });
    chrome.storage.sync.set({ tasks });
}

addTaskButton.addEventListener('click', addTask);
newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function() {
            listItem.remove();
            saveTasks();
        });
        listItem.appendChild(removeButton);
        tasksList.appendChild(listItem);
        newTaskInput.value = '';
        saveTasks();
    }
}

function loadStatistics() {
    chrome.storage.sync.get(['completedSessionsCount'], (data) => {
        completedSessionsElement.textContent = `Completed Sessions: ${data.completedSessionsCount || 0}`;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    loadStatistics();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateTimer') {
        updateDisplay(message.timeLeft);
    }
});

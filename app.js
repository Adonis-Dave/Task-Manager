
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFIWBRHpaErPoHYeg-adVLOR71KJKqpa8",
    authDomain: "task-manager-app-7fdd3.firebaseapp.com",
    projectId: "task-manager-app-7fdd3",
    storageBucket: "task-manager-app-7fdd3.appspot.com",
    messagingSenderId: "212645393136",
    appId: "1:212645393136:web:41adec678d78c52a404835",
    measurementId: "G-882SRLL9WV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





// FUNCTION TO ADD TASK
document.getElementById("addFunction").addEventListener("click", addTask);
function addTask() {
    const taskInput = document.getElementById("task-input");

    const task = taskInput.value.trim()

    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then((docRef) => {
                console.log("Document added with auto-generated ID: ", docRef.id);
                // Use the auto-generated ID (docRef.id) for further operations if needed
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        // taskInput.value = "";
    }
}




function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");

    taskItem.className = "task-item";
    taskItem.innerHTML = `
    <span> ${doc.data().task}</span>
    <button class="delete-btn" data-id="${doc.id}">Delete</button>
    `;

    taskList.appendChild(taskItem);
}


// REAL TIME LISTENER FOR TASKS
db.collection("tasks").orderBy("timestamp", "desc").onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added") {
            renderTasks(change.doc);
        }
    });
});

//FUNCTION TO DELETE TASKS
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        deleteTask(id);
    }
})
function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
}


// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// const firebaseConfig = {
//     apiKey: "AIzaSyCFIWBRHpaErPoHYeg-adVLOR71KJKqpa8",
//     authDomain: "task-manager-app-7fdd3.firebaseapp.com",
//     projectId: "task-manager-app-7fdd3",
//     storageBucket: "task-manager-app-7fdd3.appspot.com",
//     messagingSenderId: "212645393136",
//     appId: "1:212645393136:web:41adec678d78c52a404835",
//     measurementId: "G-882SRLL9WV"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// document.getElementById("addFunction").addEventListener("click", addTask);

// function addTask() {
//     const taskInput = document.getElementById("task-input");
//     const task = taskInput.value.trim();

//     if (task !== "") {
//         db.collection("tasks").add({
//             task: task,
//             timestamp: firebase.firestore.FieldValue.serverTimestamp()
//         })
//             .then((docRef) => {
//                 console.log("Document added with auto-generated ID: ", docRef.id);
//             })
//             .catch((error) => {
//                 console.error("Error adding document: ", error);
//             });
//         taskInput.value = "";
//     }
// }

// function renderTasks(doc) {
//     const taskList = document.getElementById("task-list");
//     const taskItem = document.createElement("li");
//     taskItem.className = "task-item";
//     taskItem.innerHTML = `
//         <span>${doc.data().task}</span>
//         <button class="delete-btn" data-id="${doc.id}">Delete</button>
//     `;
//     taskList.appendChild(taskItem);
// }

// db.collection("tasks").orderBy("timestamp", "desc").onSnapshot(snapshot => {
//     const changes = snapshot.docChanges();
//     changes.forEach(change => {
//         if (change.type === "added") {
//             renderTasks(change.doc);
//         }
//     });
// });

// document.getElementById("task-list").addEventListener("click", (e) => {
//     if (e.target.classList.contains("delete-btn")) {
//         const id = e.target.getAttribute("data-id");
//         deleteTask(id);
//     }
// });

// function deleteTask(id) {
//     db.collection("tasks").doc(id).delete()
//         .then(() => {
//             console.log("Document successfully deleted");
//         })
//         .catch((error) => {
//             console.error("Error deleting document: ", error);
//         });
// }
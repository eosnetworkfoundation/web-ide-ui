import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

// svelte store
import { writable } from 'svelte/store';


const firebaseConfig = {
    apiKey: "AIzaSyDcj48QWLEG0qCByoTm6wKAhovlEDEm9t4",
    authDomain: "eos-web-ide.firebaseapp.com",
    projectId: "eos-web-ide",
    storageBucket: "eos-web-ide.appspot.com",
    messagingSenderId: "216209778535",
    appId: "1:216209778535:web:ded6b125ee89769bff71c2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


const githubAuthProvider = new GithubAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

/*
Firestore rules
-----------------

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{userId} {
      allow write: if request.auth != null && request.auth.uid == userId
      	&& request.resource.data.keys().hasOnly(['userId', 'projects'])
        && request.resource.data.userId == userId
        && request.resource.data.userId is string
        && request.resource.data.projects is list
        && request.resource.data.projects.size() <= 15
        && (!projectExists(0) || isValidProject(request.resource.data.projects[0]))
        && (!projectExists(1) || isValidProject(request.resource.data.projects[1]))
        && (!projectExists(2) || isValidProject(request.resource.data.projects[2]))
        && (!projectExists(3) || isValidProject(request.resource.data.projects[3]))
        && (!projectExists(4) || isValidProject(request.resource.data.projects[4]))
        && (!projectExists(5) || isValidProject(request.resource.data.projects[5]))
        && (!projectExists(6) || isValidProject(request.resource.data.projects[6]))
        && (!projectExists(7) || isValidProject(request.resource.data.projects[7]))
        && (!projectExists(8) || isValidProject(request.resource.data.projects[8]))
        && (!projectExists(9) || isValidProject(request.resource.data.projects[9]))
        && (!projectExists(10) || isValidProject(request.resource.data.projects[10]))
        && (!projectExists(11) || isValidProject(request.resource.data.projects[11]))
        && (!projectExists(12) || isValidProject(request.resource.data.projects[12]))
        && (!projectExists(13) || isValidProject(request.resource.data.projects[13]))
        && (!projectExists(14) || isValidProject(request.resource.data.projects[14]))


      allow read: if request.auth != null && request.auth.uid == userId

      function projectExists(index){
      	return request.resource.data.projects.size() >= index+1
      }

      function isValidProject(project){
      	return project.keys().hasOnly(['id', 'name'])
        	&& project.id is string
          && project.id.size() <= 256
          && project.name is string
          && project.name.size() <= 256
      }

    }
  }
}

 */

class UserProjects {
    public userId: string;
    public projects: Array<{ id: string, name: string }>;

    constructor(json: Partial<any>) {
        Object.assign(this, json);
    }

    static key(userId: string) {
        return `projects/${userId}`;
    }
}


export const userProjects = writable<UserProjects | null>(null);

export async function getProjects(userId: string) {
    const docRef = doc(db, `projects/${userId}`);
    const docSnap = await getDoc(docRef).catch((error) => {
        console.error("Error getting document:", error);
        return null;
    });

    if (docSnap && docSnap.exists()) {
        return new UserProjects(docSnap.data());
    } else {
        return null;
    }
}

export async function saveProjects(projects: UserProjects) {
    const docRef = doc(db, `projects/${projects.userId}`);
    return await setDoc(docRef, JSON.parse(JSON.stringify(projects))).catch((error) => {
        console.error("Error writing document:", error);
        return null;
    });
}

export async function saveNewProject(id: string, name: string){
    userProjects.update((projects) => {
        if (!projects) {
            return null;
        }

        const found = projects.projects.find(p => p.id === id);
        if(found){
            found.name = name;
        } else {
            projects.projects.push({id, name});
        }

        if(projects.projects.length > 15){
            alert('You have reached the maximum number of projects. Please delete some projects to make room for new ones.');
            return projects;
        }

        for(let p of projects.projects){
            if(p.id.length > 256 || p.name.length > 256){
                alert('Project name must be less than 256 characters');
                return projects;
            }
        }

        saveProjects(projects);

        return projects;
    });
}

export async function removeProject(id: string){
    userProjects.update((projects) => {
        if (!projects) {
            return null;
        }

        projects.projects = projects.projects.filter(p => p.id !== id);

        saveProjects(projects);

        return projects;
    });
}


async function loginResultToUserProjects(uid: string) {
    const existing = await getProjects(uid);
    if (existing) {
        userProjects.set(new UserProjects(existing));
        return true;
    }

    const projects = new UserProjects({ userId: uid, projects: [] });
    userProjects.set(new UserProjects({ userId: uid, projects: [] }));
    await saveProjects(projects);
}

export async function loginWithGoogle() {
    return signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            // return loginResultToUserProjects(result);
            return true;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(errorCode, errorMessage);

            return null;

        });
}

export async function loginWithGithub() {
    return signInWithPopup(auth, githubAuthProvider)
        .then((result) => {
            return true;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.error(errorCode, errorMessage);

            return null;

        });
}

export async function logout() {
    return auth.signOut()
        .then(() => {
            userProjects.set(null);
            return true;
        }).catch((error) => {
            console.error(error);
            return null;
        });

}

auth.onAuthStateChanged((user) => {
    if (user) {
        return loginResultToUserProjects(user.uid);
    }
});

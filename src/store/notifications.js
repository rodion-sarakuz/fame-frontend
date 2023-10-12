import * as firebase from "firebase/app";



export default {
    actions: {
        async getCollection({dispatch, commit}, {collection}) {
            try {
                let db = firebase.firestore();
                db.collection(collection).get()
                    .then(querySnapshot => {
                        let data = [];
                        // return querySnapshot;
                        querySnapshot.forEach(doc => {
                            data.push({id: doc.id, data: doc.data()});
                        });
                        return data;
                    });
            } catch (e) {
                console.log(e);
            }
        }
    }
}

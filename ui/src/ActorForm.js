import {useState} from "react";

export default function ActorForm(props) {
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    function addActor(event) {
        event.preventDefault();
        props.onActorSubmit({name, surname});
        setTitle('');
        setName('');
        setSurname('');
    }

    return <form onSubmit={addActor}>
        <h2>Add actor</h2>
        <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(event) => setTitle(event.target.value)}/>
        </div>
        <div>
            <label>Name</label>
            <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
        </div>
        <div>
            <label>Surname</label>
            <input type="text" value={surname} onChange={(event) => setSurname(event.target.value)}/>
        </div>
        <button>{props.buttonLabel || 'Submit'}</button>
    </form>;
}

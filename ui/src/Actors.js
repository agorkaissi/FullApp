import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import ActorForm from "./ActorForm";
import ActorsList from "./ActorsList";

const Actors = () => {
    const [actors, setActors] = useState([]);
    const [addingActor, setAddingActor] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const backHome = () => {
        navigate("/");
    };

    useEffect(() => {
        const fetchActors = async () => {
            setLoading(true);
            const response = await fetch(`/actors`);
            if (response.ok) {
                const actors = await response.json();
                setActors(actors);
            }
        };
        fetchActors()
            .finally(() => setLoading(false));
    }, []);

    async function handleAddActor(actor) {
        const response = await fetch('/actors', {
            method: 'POST',
            body: JSON.stringify(actor),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
            const addingResponse = await response.json();
            actor.id = addingResponse.id;
            setActors([...actors, actor]);
            setAddingActor(false);
        }
    }

    async function handleDeleteActor(actor) {
        const url = `/actors/${actor.id}`;
        const response = await fetch(url, {method: 'DELETE'});
        if (response.ok) {
            const nextActors = actors.filter(a => a !== actor);
            setActors(nextActors);
        }
    }


    return (

        <div className="container">
            <div className="section-header">
                <button className="back-button" onClick={backHome}>
                    <span className="back-arrow">←</span>
                    <span className="back-text">Back</span>
                </button>

                <h2 className="section-title">Actors Database</h2>
            </div>
            <div className="box bottom">
                {loading && <div className="lds-ellipsis">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {!loading && (
                    <div>
                        {actors.length === 0
                            ? <p>No actors yet. Maybe add something?</p>
                            : <ActorsList actors={actors}
                                          onDeleteActor={handleDeleteActor}
                            />}
                        {addingActor
                            ? <ActorForm onActorSubmit={handleAddActor}
                                         buttonLabel="Add an actor"
                            />
                            : <button onClick={() => setAddingActor(true)}>Add an actor</button>}
                    </div>
                )}
            </div>
        </div>

    );
};

export default Actors;
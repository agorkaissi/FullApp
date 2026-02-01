import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import ActorForm from "./ActorForm";
import ActorsList from "./ActorsList";
import {Modal} from 'antd';

const Actors = () => {
    const [actors, setActors] = useState([]);
    const [addingActor, setAddingActor] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const backHome = () => {
        navigate("/");
    };

    const confirmDeleteActor = (actor) => {
        Modal.confirm({
            title: "Are you sure you want to remove this actor?",
            className: "milligram-confirm",
            content: `${actor.name} ${actor.surname}`,
            okText: "Yes",
            cancelText: "No",
            okType: "danger",
            style: { border: "2px solid #9b4dca", borderRadius: "6px" },
            okButtonProps: {
                className: "button button-outline"
            },
            cancelButtonProps: {
                className: "button"
            },
            onOk() {
                return handleDeleteActor(actor);
            },
        });
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
        try {
            const url = `/actors/${actor.id}`;
            const response = await fetch(url, {method: "DELETE"});

            if (!response.ok) {
                throw new Error("Delete failed");
            }

            setActors(prev => prev.filter(a => a.id !== actor.id));
        } catch (err) {
            Modal.error({
                title: "Error",
                content: "Actor removal not finalised",
            });
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
                                          onDeleteActor={confirmDeleteActor}
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
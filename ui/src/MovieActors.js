import {useEffect, useState} from "react";


export default function MovieActors({id, isOpen, onClose, onUpdate}) {
    const [actorsToAssign, setActorsToAssign] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedActor, setSelectedActor] = useState("");

    useEffect(() => {
        fetch(`/movies/${id}/actors`)
            .then(res => res.json())
    }, [id]);

    useEffect(() => {
        if (!isOpen) return;
        setLoading(true);
        fetch("/actors")
            .then(res => res.json())
            .then(setActorsToAssign)
            .finally(() => setLoading(false));
    }, [isOpen]);

    function assignActor(actorId) {
        fetch(`/movies/${id}/actors/${actorId}`, {method: "POST"})
            .then(() => {
                onUpdate();
                onClose();
            });
    }

    if (!isOpen) return null;

    return (
        <div>
            <h3>Choose actor</h3>

            {loading && <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>}

            {!loading && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (selectedActor) {
                            assignActor(selectedActor);
                        }
                    }}
                >
                    <fieldset>
                        <label htmlFor="actorSelect">Add actor</label>

                        <select
                            id="actorSelect"
                            value={selectedActor}
                            onChange={(e) => setSelectedActor(e.target.value)}
                        >
                            <option value="">-- choose actor --</option>

                            {actorsToAssign.map(actor => (
                                <option key={actor.id} value={actor.id}>
                                    {actor.name} {actor.surname}
                                </option>
                            ))}
                        </select>

                        <input
                            className="button-primary"
                            type="submit"
                            value="Add"
                            disabled={!selectedActor}
                        />
                    </fieldset>
                </form>
            )}
        </div>
    );
}
import ActorListItem from "./ActorListItem";

export default function ActorList(props) {
    return <table className="actors-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {props.actors.map(actor => (
                    <ActorListItem
                        key={actor.id}
                        actor={actor}
                        onDelete={() => props.onDeleteActor(actor)}
                    />
                ))}
            </tbody>
        </table>
    ;
}

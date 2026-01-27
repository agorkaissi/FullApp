import ActorListItem from "./ActorListItem";

export default function ActorList(props) {
    return <div>
        <ul className="actors-list">
            {props.actors.map(actor => <li>
                <ActorListItem actor={actor} onDelete={() => props.onDeleteActor(actor)}/>
            </li>)}
        </ul>
    </div>;
}

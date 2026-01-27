export default function ActorListItem(props) {
    return (
        <div>
            <div>
                <strong>Name:</strong> {props.actor.name},
                {' '}
                <strong>Surname:</strong> {props.actor.surname},
                {' '}
                <a onClick={props.onDelete}>Delete</a>
            </div>
        </div>
    );
}

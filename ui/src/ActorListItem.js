export default function ActorListItem(props) {
    return (
        <div>
            <div>
                <strong>Name:</strong> {props.actor.name}
                {' '}
                <strong>Surname:</strong> {props.actor.surname}
                {' '}
                <input className="button button-clear" onClick={props.onDelete} type="submit" value="Delete"/>
            </div>
        </div>
    )
        ;
}

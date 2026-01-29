export default function ActorListItem(props) {
    return (
        <tr>
            <td>{props.actor.name}</td>
            <td>{props.actor.surname}</td>
            <td>
                <input
                    className="button button-clear"
                    onClick={props.onDelete}
                    type="button"
                    value="Delete"
                />
            </td>
        </tr>
    )
        ;
}

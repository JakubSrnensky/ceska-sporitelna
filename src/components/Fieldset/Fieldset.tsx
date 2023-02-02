import './Fieldset.scss'

type props = {
    type: 'input' | 'textarea'
    required?: boolean
    children?: React.ReactNode,
    name?: string,
    value?: string
    placeholder?: string
}

export default function Fieldset(props: props) {

    return (
        <fieldset className="fieldset">
            {props.children && <label className="fieldset-label">{props.children}</label>}
            {props.required && <small className="fieldset-error">Pole je nutné vyplnit</small>}
            <props.type 
                type={props.type} 
                name={props.name}
                defaultValue={props.value} 
                placeholder={props.placeholder} 
                className={`fieldset-${props.type}`}
                required
            />
        </fieldset>
    )
}
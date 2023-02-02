import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Form from '../../components/Form/Form'
import Fieldset from '../../components/Fieldset/Fieldset'
import Button from '../../components/Button/Button'
import Container from '../../components/Container/Container'
import Title from '../../components/Title/Title'
import PopUp from '../../components/Popup/PopUp'
import { fetchData } from '../../hooks/fetchData'
import './Login.scss'

type user = {
    id: string
    user: string
}

export default function Login() {

    const navigate = useNavigate();

    const [open, setOpen] = useState<boolean>(false);
    const [ users, setUsers ] = useState<any>()

    const handlerClick = async (event: any) => {
        event.preventDefault();
       
        const findUser = users.find((element: user) => {
            return (element.user === event.target.login.value)
        })
     
        if(findUser) {
            localStorage.setItem("userCs", JSON.stringify(findUser));
            navigate("/")
        } else if(!findUser && event.target.login.value){
            setOpen(true)
        }
    }

    const onClickClose = () => {
        setOpen(false)
    }

    useEffect(() => {

        const getUsers = async () => {
            setUsers(await fetchData('http://localhost:8080/login'))
        };

        getUsers()
        
    },[])

    return (
        <Container className="login">

            <Form onSubmit={handlerClick}>
                <Title as="h1">Přihlášení</Title>
                <Fieldset type="input" name="login" />
                <Button type="submit">Přihlásit se</Button>
            </Form>

            {open && 
                <PopUp onClick={onClickClose} >
                    Je nám líto, ale login je chybný!
                </PopUp>
            }

        </Container>
    )
}
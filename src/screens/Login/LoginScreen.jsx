import styles from './LoginScreen.module.css';
import { useContext, useState } from 'react';
import brasao from '../../assets/imgs/brasao.png'
import { UserContext } from '../../context/UserContext';

export const LoginScreen = () => {

    const {signIn} = useContext(UserContext);
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [errMessage, setErrMessage] = useState();

    const errorMessages = {
       'Firebase: Error (auth/invalid-email).' : 'Email Inválido',
       'Firebase: Error (auth/invalid-password).' : 'Senha Inválida',
       'Firebase: Error (auth/invalid-login-credentials).' : 'Credenciais de Acesso Inválidas',
       'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).' : 'Acesso bloqueado por excesso de tentativas inválidas'
    }

    const handleSumbitLoginForm = async(event) => {
        event.preventDefault();
        try {
            await signIn(email, password);
        }
        catch (err) {
            setErrMessage(errorMessages[err.message] ? errorMessages[err.message] : err.message);
        }
    };

    return(
        <div className={styles.container}>
            <div className={styles.loginContainer}>
                <div className={styles.titleContainer}>
                    <img className={styles.logo} src={brasao} alt="" />
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h2 className={styles.title}>Controle de Frota</h2>
                    <h1 className={styles.subtitle}>Secretaria Municipal de Assistência Social</h1>
                </div>
               
                </div>
                <form onSubmit={(e) => handleSumbitLoginForm(e)}>
                    <div className={styles.inputContainer}>
                        <span>Email:</span>
                        <input type="text" onChange={(text) => setEmail(text.target.value)}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <span>Senha:</span>
                        <input type="password" onChange={(text) => setPassword(text.target.value)}/>
                    </div>
                    <button type="submit">Entrar</button>
                    <span style={{color: 'red', textAlign: 'center'}}>{errMessage}</span>
                </form>
                
            </div>
        </div>
    );

    
}
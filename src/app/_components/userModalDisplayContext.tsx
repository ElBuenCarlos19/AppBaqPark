import {useState, createContext, useContext} from 'react';
export const userModalContext = createContext({visible: false, open: () => {}, close: () => {}});

export const UserModalProvider = ({children}) => {
    const [visible, setVisible] = useState(false);
    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return (
        <userModalContext.Provider value={{visible, open, close}}>
            {children}
        </userModalContext.Provider>
    );
}

export const useModalContext = ()=>{
    return useContext(userModalContext);
}

import {useEffect, useState} from "react"   ;

function App(){
    const [backendMessage, setBackendMessage] = useState(
        "cheking BackenDD!!"
    );

    useEffect(() =>{
        const checkBackend =  async()=>{
            
            try{
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await fetch(`${apiBaseUrl}/api/health`);

                if(!response.ok) {
                    throw new Error("Error From Backenddd!!!");
                }
                const data = await response.json();
                setBackendMessage(data.message);
            }

            catch(error){
                console.error(error);
                setBackendMessage("Unable to connect to Backenddd!");
            }
        };

        checkBackend();  
    }, []);


    return (
        <main>
            <h1>Custom Room Booking Platform</h1>
            <p>React Frontenddd is runninnggg! .</p>

            <h2>Backend StatuSS:</h2>
            <p>{backendMessage}</p>
        </main>
    )
}

export default App;
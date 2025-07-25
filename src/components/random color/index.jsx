
import {useState, useEffect} from 'react'



export default function RandomColor(){

    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('#000000')

    function randomColorUtility(length){
        return Math.floor(Math.random()*length)
    }

    function handleCreateRandomHEXColor(){
        //#123456
        const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
        let hexColor = "#"

        for(let i =0; i<6; i++){
            hexColor += hex[randomColorUtility(hex.length)]
        }

        console.log(hexColor);

        setColor(hexColor)

    }

    function handleCreateRandomRGBColor(){
        const r = randomColorUtility(256)
        const g = randomColorUtility(256)
        const b = randomColorUtility(256)


        setColor(`rgb(${r}, ${g}, ${b})`);
    }

    useEffect(() =>{
        if(typeOfColor === "rgb") handleCreateRandomRGBColor();
        else handleCreateRandomHEXColor();
    }, [typeOfColor]);

    return(
        <>
            <h1>Random Color Generator</h1>
                <div style={{
                    width : '100vw',
                    height : '100vh',
                    background : color,
                }}>
                    <button onClick= {()=> setTypeOfColor('hex')}>Generate HEX Random Color</button>
                    <button onClick= {()=> setTypeOfColor('rgb')}> Generate RGB Random Color</button>
                    <button onClick= {typeOfColor === 'hex' ? handleCreateRandomHEXColor : handleCreateRandomRGBColor}>Generate Random Color</button>

                    <div style= {{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color : '#fff',
                        fontSize : '60px',
                        marginTop : '50px',
                        flexDirection: 'column',
                        gap: '20px'

                    }} className="display">
                        <h3>{typeOfColor === 'rgb' ?'RGB Color ' : 'HEX Color '}</h3>
                        <h1>{color}</h1>

                    </div>
                    
                </div>
        </>
    )

}
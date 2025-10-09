import './info.css'
export default function Component({ progress, mean }) {

    const colors = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`;

    return (
        <div className='option' style={{ backgroundColor: colors} } >
            <h1>{progress}</h1>
            <p>{mean}</p>
        </div>
    );
}

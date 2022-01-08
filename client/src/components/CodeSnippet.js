import './css/CodeSnippet.css';
import ReactMarkdown from 'react-markdown';
import DevIcon from "devicon-react-svg";
import Swal from 'sweetalert2'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// const MySwal = withReactContent(Swal);

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

const randomColor = (() => {
    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return () => {
        var h = randomInt(0, 360);
        var s = randomInt(42, 98);
        var l = randomInt(40, 90);
        return `hsl(${h},${s}%,${l}%)`;
    };
})();

const copyCode = ((code) => {
    navigator.clipboard.writeText(code);
    Toast.fire({
        icon: 'success',
        title: 'Copied to clipboard !'
    })
});


const CodeSnippet = ({ codeSnippet }) => {

    console.log(codeSnippet.code);

    console.log(codeSnippet.code);
    return (
        <div className='code-snippet-container'>
            <div className='code-snippet-title'>
                <h3 onClick={() => copyCode(codeSnippet.code)}><i>#{codeSnippet.id}</i></h3>
                <h1 onClick={() => copyCode(codeSnippet.code)}>{codeSnippet.title}</h1>
                <DevIcon className='langage-icon' icon={codeSnippet.language} style={{ fill: randomColor(), width: '50px' }} />
            </div>
            <div className='code-snippet-description'>
                <h4><i>{codeSnippet.description}</i></h4>
            </div>
            <div className='code-snippet-code'>
                <ReactMarkdown
                    children={codeSnippet.code}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            return !inline && codeSnippet.language !== undefined ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, '')}
                                    style={materialDark}
                                    language={codeSnippet.language}
                                    PreTag="div"
                                    {...props}
                                />
                            ) : (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            )
                        }
                    }}
                />
            </div>
        </div>
    )
}


export default CodeSnippet

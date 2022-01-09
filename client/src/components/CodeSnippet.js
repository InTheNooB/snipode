import './css/CodeSnippet.css';
import ReactMarkdown from 'react-markdown';
// import DevIcon, { iconList } from "devicon-react-svg";
import Swal from 'sweetalert2';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';


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


const copyCode = ((code) => {
    code = code.replace("~~~\n", "").replace("\n~~~", "");
    navigator.clipboard.writeText(code);
    Toast.fire({
        icon: 'success',
        title: 'Copied to clipboard !'
    })
});

const CodeSnippet = ({ codeSnippet }) => {
    return (
        <div className='code-snippet-container'>
            <div className='code-snippet-title'>
                <h3 onClick={() => copyCode(codeSnippet.code)}><i>#{codeSnippet.id}</i></h3>
                <h1 onClick={() => copyCode(codeSnippet.code)} style={{ color: codeSnippet.color }}>{codeSnippet.title}</h1>
                {/* <i class={`devicon-${codeSnippet.language}-plain`}></i> */}
                <img src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${codeSnippet.language}/${codeSnippet.language}-plain.svg`} alt="logo" />
            </div>
            <div className='code-snippet-description'>
                <h4><i>{codeSnippet.description}</i></h4>
            </div>
            <div className='code-snippet-code'>
                <ReactMarkdown
                    children={`~~~\n${codeSnippet.code}\n~~~`}
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

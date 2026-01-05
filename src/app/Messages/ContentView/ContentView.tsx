import PropTypes from 'prop-types';
import {Component} from 'react';

import style from './style.module.scss';

export class ContentView extends Component {
    static propTypes = {
        content: PropTypes.object.isRequired,
    };

    static defaultProps = {
        content: null,
    };

    render() {
        const content = this.props?.['content'];
        if (!content) {
            return <span>null</span>;
        }

        const type = content.type;
        const className = content.htmlClassName;
        const data = content.data;
        const contentStyle = content.style;

        if (type === 'text') {
            const text = data.text;

            return <span className={style.text} style={{...contentStyle, 'whiteSpace': 'pre-line'}}>{text}</span>;
        }
        else if (type === 'image') {
            return (<img className={className} style={style}
                alt="" src={data.url}></img>);
        }
        else if (type === 'hyperlink') {
            return (
                <span> <a className={className} style={{...contentStyle, 'whiteSpace': 'pre-line'}}
                    href={data.url}>
                    <span>{data.text}</span>
                </a> </span>
            );
        }
        else if (type === 'html') {
            return (<span className={className} style={contentStyle}
                dangerouslySetInnerHTML={{__html: data.html}}/>);
        }

        return <div>Unknown content type &apos;{type}&apos;</div>;
    }
}

import React, { Component } from 'react';
import classNames from 'classnames';

import checkImg from '../img/check.svg';
import checkCompleteImg from '../img/check-complete.svg'
import clear from '../img/clear.svg';
import edit from '../img/icons8-edit.svg';

import './TodoItem.css';

class TodoItem extends Component {

    render() {
        const { item, onClick, editItem, deleteItem } = this.props;
        let url = checkImg;
        if (item.isComplete) {
            url = checkCompleteImg;
        }
        return (
            <div className={classNames('TodoItem', {
                'TodoItem-complete': item.isComplete
            })}>
                <img onClick={onClick}
                    src={url}
                    width={32}
                    height={32}
                    alt="check" />
                <p>{item.title}</p>
                <img className="Thover"
                    src={edit}
                    width={20}
                    height={20}
                    alt="edit" 
                    onClick={editItem}/>
                <img className="Thover"
                    onClick={deleteItem}
                    src={clear}
                    width={20}
                    height={20}
                    alt="delete" />
            </div>
        );
    }
}

export default TodoItem;
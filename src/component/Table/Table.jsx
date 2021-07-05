import style from './style.module.css'

import { addTodo, downloadTodo, deleteTodo, editToto } from '../../redux/actions/todoAC'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Children } from 'react'

export default function Table() {
	const { todo } = useSelector(prev => prev)
	const dispatch = useDispatch();

	const [warning, setWarning] = useState('')
	const [name, setName] = useState('')
	const [type, setType] = useState('main')
	const [color, setColor] = useState('#ffffff')
	const [editText, setEditText] = useState('')
	const [editStack, setEditStack] = useState()
	const [massage, setMassage] = useState('color')





	function checkAddTodo() {
		if (!name || !type || !color) {
			setWarning('Заполните все поля !')
			return
		} else {
			dispatch(addTodo({ id: new Date().getTime(), name, type, color, edit: false }))
			setWarning('');


			return
		}
	}
	function save(data) {
		if (data) {
			data = JSON.stringify({ data })
			localStorage.setItem('todo', data)
			{ setWarning('Запись сохранена!') }
			setTimeout(() => setWarning(''), 1500)
		}
		return
	}
	function download() {

		let data = JSON.parse(localStorage.getItem('todo'));

		if (data && data !== JSON.stringify(todo)) {
			dispatch(downloadTodo(data.data))
			setWarning('Загруженно!')
			setTimeout(() => setWarning(''), 1500)
		}
		return
	}

	function edit(id, edit, name, type, color) {
		// console.log(id, edit, name, type, color, position);
		// if (position < 0 || position > todo.length || typeof position !== 'number') {
		// 	setMassage('Введите допустимое значение позиции ')
		// 	setTimeout(() => { setMassage('') }, 1500)
		// 	return
		// }
		dispatch(editToto({ id, edit, name, type, color }))
		setEditText('')
		return
	}

	return (
		<div className={style.table}>
			<div className={style.table_add}>
				<div className={style.table_add_title}>
					<h2>Добавить запись </h2>
				</div>
				{warning && <div className={style.table_add_warning}>
					<p>{warning}</p>
				</div>
				}
				<div className={style.table_add_form}>
					<div><h3>название</h3></div>
					<div>
						<textarea onChange={e => setName(e.target.value)} value={name} type="text" />
					</div>
					<div><h3>позиция</h3></div>
					<div>
						<select onChange={e => setType(e.target.value)} value={type} name="" id="">
							<option value="main">главная</option>
							<option value="side">второстепенная</option>
						</select>
					</div>
					<div><h3>цвет заметки </h3></div>
					<div>
						<input type="color" onChange={e => setColor(e.target.value)} value={color} />
					</div>
					<div>
						<button onClick={() => {
							checkAddTodo()
						}}>Добавить</button>
					</div>
				</div>

				<div className={style.table_manipulate_form}>
					<button onClick={() => save(todo)}>Сохранить</button>
					<button onClick={() => download()}>Загрузить</button>
				</div>
			</div>
			<div className={style.table_view}>
				<div className={style.table_view_title}>
					<h3>Главные задачи</h3>
				</div>
				{todo && todo.map((el, i) => {
					if (el.type === 'main') {
						return <div style={{ backgroundColor: `${el.color}` }}>
							<div className={style.table_view_task}>
								{
									el.edit ?
										<div>
											<div className={style.massage}>
												{massage}
											</div>
											<div>
												<input type='number'
													onChange={e => setEditStack(e.target.value)}
													value={editStack}
													placeholder={i}
												/>
												<input type="text"
													onChange={e => setEditText(e.target.value)}
													value={editText}
													placeholder={el.name}
													style={{backgroundColor: el.color}}
													/>
													{el.color}
											</div>
										</div>
										:
										<div>№{i + 1} {el.name}</div>
								}
							</div>
							<div className={style.table_view_edit}>
								<input type="color" value={el.color} onChange={(e)=>edit(el.id,'','','',e.target.value)} data-id={el.id} />
								{el.edit ?
									<button
										data-id={el.id}
										onClick={(e) => edit(parseInt(e.target.dataset.id), false, editText, '', '', parseInt(editStack))}
									>Сохранить</button>
									:
									<button
										data-id={el.id}
										onClick={(e) => edit(parseInt(e.target.dataset.id), true)}
									>Редактировать</button>
								}

								<button
									data-id={el.id}
									onClick={(e) => dispatch(deleteTodo(parseInt(e.target.dataset.id)))}
								>Удалить</button>
								
							</div>
						</div>
					}
				})
				}



				<div className={style.table_view_title}>
					<h3>Второстепенная</h3>
				</div>
				{todo.map(el => {
					if (el.type === 'side') {
						return <div style={{ backgroundColor: `${el.color}` }}>
							<div className={style.table_view_task}>
								{el.name}
							</div>
						</div>
					}
				})
				}
			</div>
		</div >
	)
}




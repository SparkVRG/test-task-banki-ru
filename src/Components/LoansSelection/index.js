import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import './style.css';
import loansData from './assets/mock.json';
import sortIcon from './assets/sort-icon.png';
import shareIcon from './assets/share-icon.png';

function LoansSelection() {
    let currentAmount = useLocation().pathname.split('/')[useLocation().pathname.split('/').length - 1];
    let currentSorting = useLocation().pathname.split('/')[useLocation().pathname.split('/').length - 3];

    let [loanAmount, setLoanAmount] = useState(currentAmount > 0 ? currentAmount : '');
    let [sortingWindow, setSortingWindow] = useState(false);
    let [sorting, setSorting] = useState(currentSorting);

    if (sorting === 'max') {
        loansData.products.sort((a, b) => a.amount < b.amount ? 1 : -1);
        currentSorting = 'max';
    } else {
        loansData.products.sort((a, b) => a.amount > b.amount ? 1 : -1);
        currentSorting = 'min';
    }

    let results = loansData.products.map(item => {
        if (item.amount < loanAmount) return;

        return (
            <div className='results__item-container' key={nanoid()}>
                <div className='results__item-title'>
                    <img className='results__item-logo' src={`https:${item.logo}`} alt='Bank Logo' />
                    <h2 className='results__item-name'>{item.name}</h2>
                </div>
                <div className='results__item-amount'>
                    <span className='results__item-amount-title'>Сумма</span>
                    <span className='results__item-amount-sum'>{`${new Intl.NumberFormat('ru-RU').format(item.amount)}`} &#8381;</span>
                </div>
            </div>
        );

        // Чтобы не завязывать атрибут key на порядковом номере массива, я использую библиотеку генерации уникальных ID - nanoid
    });

    return (
        <main className='loans-selection'>
            <section className='loan-amount-field'>
                <input className='loan-amount-field__input'
                    type='number'
                    min='0'
                    value={loanAmount}
                    onChange={event => setLoanAmount(event.target.value)}
                    placeholder='Сумма кредита'
                    onFocus={event => event.target.placeholder = ''}
                    onBlur={event => {
                        event.target.placeholder = 'Сумма кредита'

                        if (+loanAmount === 0) {
                            setLoanAmount('');
                        }
                    }}
                    onKeyDown={e => { if (e.key === '-') e.preventDefault() }}
                />

                {/* Атрибуты type, min и onKeyDown помогут запретить ввод отрицательных чисел
                В атрибуте onBlur также есть проверка, чтобы при вводе 0 после потери фокуса этот 0 не сохранялся в поле, а заменялся плейсхолдером */}
            </section>
            <section className='buttons'>
                <button className='buttons__sorting' onClick={() => setSortingWindow(!sortingWindow)}>
                    Сортировать
                    <img src={sortIcon} alt='Arrows' />
                    <div className='buttons__sorting-window' style={sortingWindow ? { display: 'block' } : { display: 'none' }}>
                        <button className='buttons__sorting-max' onClick={() => setSorting('max')}>По максимальной сумме</button>
                        <button className='buttons__sorting-min' onClick={() => setSorting('min')}>По минимальной сумме</button>
                    </div>
                </button>
                <button className='buttons__share'
                    onClick={() => {
                        navigator.clipboard.writeText(`http://localhost:3000/sort/${currentSorting}/amount/${loanAmount === '' ? 0 : loanAmount}`)
                    }}>
                    <img src={shareIcon} alt='Arrow' />
                    Поделиться
                </button>

                {/* Кнопка "Поделиться" скопирует в буфер обмена страницу с выбранными пользователем сортировкой и суммой кредитов. В рамках тестового задания адрес сайта указан http://localhost:3000/ */}
            </section>
            <section className='results'>
                {results}
            </section>
        </main>
    );
}

export default LoansSelection;
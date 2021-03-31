// thecatapi로 검색 api를 사용해보자
const API_URL = 'https://api.thecatapi.com/v1/breeds/search';
const ALL_CAT_API_URL = 'https://api.thecatapi.com/v1/breeds';

const $searchInput = document.querySelector('.SearchInput');// $를 붙이는 것은 일반적인 객체가 아닌 DOM객체를 의미한다.`
const $loadingIndicator = document.querySelector('.LoadingIndicator');// $를 붙이는 것은 일반적인 객체가 아닌 DOM객체를 의미한다.`
const $textList = document.querySelector('.TextList');// $를 붙이는 것은 일반적인 객체가 아닌 DOM객체를 의미한다.`
const $infoParagraph = document.querySelector('.InfoParagraph');// $를 붙이는 것은 일반적인 객체가 아닌 DOM객체를 의미한다.`

// promise, fetch, async의 개념을 공부할 필요가 있음.

let debounce = null;

$searchInput.addEventListener('keyup', (event) => {
    
    const query = event.target.value;

    clearTimeout(debounce);
    debounce = setTimeout( async (searchText) => {
        let cats = null;
        if (!searchText) {
            $loadingIndicator.style.visibility = 'visible';
            const response = await fetch(`${ALL_CAT_API_URL}`);
            cats = await response.json();
            $loadingIndicator.style.visibility = 'hidden';
        } else {
            $loadingIndicator.style.visibility = 'visible';
            const response = await fetch(`${API_URL}?q=${searchText}`);
            cats = await response.json();
            $loadingIndicator.style.visibility = 'hidden';
        }
        if (!cats.length) {
            $textList.innerHTML = '';
            $textList.style.visibility = 'hidden';
            $infoParagraph.innerHTML = '해당하는 검색어가 없습니다.';
            return;
        }
        console.log(cats.length);
        $textList.innerHTML = cats
            .map((cat) => `<li>${cat.name}</li>`)
            .join('');
        $textList.style.visibility = 'visible';
        $infoParagraph.innerHTML = '';
    }, 500, query);
})
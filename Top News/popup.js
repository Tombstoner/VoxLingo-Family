const news = document.getElementById('headlines');
const apiKey = '47db0e6e1d874dfaa2647aae6559f136';
const newsUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

fetchNews();

async function fetchNews() {
  try {
    const response = await fetch(newsUrl);
    const data = await response.json();
    for (let i = 0; i < 5; i++) {
      const ul = document.createElement('ul');
      ul.innerHTML = `<hr>
        <li style="color: #F4CE14; font-size: 20px;">${data.articles[i].title}</li>
        <li>${data.articles[i].description}</li>
        <li><a href="${data.articles[i].url}" target="_blank" style="color: #F4CE14; text-decoration: underline;">Source</a></li>
      `;
      news.appendChild(ul);
    }
  } catch (error) {
    console.error('Error fetching news data:', error);
  }
}

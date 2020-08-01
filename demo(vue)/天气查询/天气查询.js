let app = new Vue({
    el: "#app",
    data: {
        city: "",
        weatherList: [],
        hotCitys: ["北京", "上海", "广州", "深圳"]
    },
    methods: {
        searchWeather: function() {
            axios.get('http://wthrcdn.etouch.cn/weather_mini?city=' + this.city)
                .then(response => {
                    console.log(response.data.data.forecast);
                    this.weatherList = response.data.data.forecast
                })
                .catch(function(err) {})
        },
        clickSearch: function(item) {
            this.city = item;
            this.searchWeather()
        }
    }
})
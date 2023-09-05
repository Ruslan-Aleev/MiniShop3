ms3.request = {
    headers: {},
    baseurl: '',
    init () {
        document.addEventListener('submit', event => {
            if (event.target.classList.contains('ms3_form')) {
                event.preventDefault()
                const form = event.target
                const formData = new FormData(form)
                ms3.request.send(formData)
            }
        })
    },
    async send (formData) {
        const response = await this.post(formData)
        console.log(response)
    },
    async get (formData = new FormData()) {
        try {
            this.setBaseUrl()
            this.setHeaders()
            const url = new URL(this.baseurl)
            url.search = new URLSearchParams(formData).toString()
            console.log(this.headers)
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            })
            return await response.json()
        } catch (e) {
            console.warn('Error', e.message)
        }
    },
    async post (formData = new FormData()) {
        this.setBaseUrl()
        this.setHeaders()
        try {
            const response = await fetch(this.baseurl, {
                    method: 'POST',
                    headers: this.headers,
                    body: formData
                }
            )
            return await response.json()
        } catch (e) {
            console.warn('Error', e.message)
        }
    },
    setBaseUrl () {
        this.baseurl = ms3.config.actionUrl
    },
    setHeaders (headers = {}) {
        this.headers = {
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
        const ms3Token = localStorage.getItem(ms3.config.tokenName)
        if (ms3Token !== null) {
            this.headers.ms3Token = ms3Token
        }
        this.headers = Object.assign(this.headers, headers)
    },
}
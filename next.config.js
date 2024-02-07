/** @type {import('next').NextConfig} */

const nextConfig = {}

module.exports = {
    nextConfig,
    async redirects(){
        return [
            {
                source: '/',
                destination: '/Login',
                permanent: true,
            },
        ]
    }
}

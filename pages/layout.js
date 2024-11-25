import Head from "next/head";


export default function Layout({ children }) {
    <html lang="en">
        <Head>
            <title>Matrix</title>
            <meta name="description" content="matrix homage with threejs and blender" />
            <meta name="author" content="Tal Hayut" />
        </Head>
        <body>{children}</body>
    </html>
}
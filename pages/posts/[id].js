import Layout from '../../components/layout.js';
import styles from '../../styles/[id].module.css';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../components/date';
import Head from 'next/head';
import Link from 'next/link';

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({postData}) {
  return(
	<Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <small><Date dateString={postData.date} /></small>
    <h1>{postData.title}</h1>
		
		<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    <div className={styles.backToHome}>
      <Link href="/">← Back to home</Link>
    </div>
	</Layout>
	) ;
}
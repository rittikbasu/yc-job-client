import Table from "../components/Table.js";

export default function Home({ data }) {
  // sort objects in data by time
  data.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });
  console.log(data.length);
  return <Table data={data} />;
}

export const getStaticProps = async () => {
  const allJobsres = await fetch(
    "https://hacker-news.firebaseio.com/v0/jobstories.json?"
  );
  const allJobsArr = await allJobsres.json();
  const data = [];
  async function sleep(ms) {
    console.log(`sleeping for ${ms} ms`);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const jobs = allJobsArr.map(async (id) => {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const jobRes = await fetch(url);
    const job = await jobRes.json();
    data.push(job);
  });
  await sleep(300);
  while (data.length < 50) {
    await sleep(50);
  }

  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
};

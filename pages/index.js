import Table from "../components/Table.js";
import sleep from "../utils/sleep.js";

export default function Home({ data }) {
  // sort objects in data by time
  data.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });
  // data.map((item) => {
  //   console.log(item.url);
  // });
  // console.log(jobs);
  return <Table data={data} />;
}

export const getStaticProps = async () => {
  const allJobsres = await fetch(
    "https://hacker-news.firebaseio.com/v0/jobstories.json?"
  );
  const allJobsArr = await allJobsres.json();
  const data = [];

  const jobs = allJobsArr.map(async (id) => {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const jobRes = await fetch(url);
    const job = await jobRes.json();
    data.push(job);
  });
  await sleep(500);

  // loop over data and if url is undefined, change it to null
  data.map((item) => {
    if (item.url === undefined) {
      item.url = `https://news.ycombinator.com/item?id=${item.id}`;
    }
  });

  return {
    props: {
      data: data,
      // jobs: allJobs,
    },
    revalidate: 1,
  };
};

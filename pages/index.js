import Table from "../components/Table.js";
import sleep from "../utils/sleep.js";
import Footer from "../components/Footer.js";
import { getBatch, removeBatchFromTitle } from "../utils/regex.js";

export default function Home({ data }) {
  // sort objects in data by time
  data.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
  });
  return (
    <div className="h-screen">
      <Table data={data} />
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const allJobsRes = await fetch(
    "https://hacker-news.firebaseio.com/v0/jobstories.json?"
  );
  const allJobsArr = await allJobsRes.json();
  const data = [];

  const jobs = allJobsArr.map(async (id) => {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
    const jobRes = await fetch(url);
    const job = await jobRes.json();
    data.push(job);
  });
  await sleep(500);

  // loop over data and if url is undefined, change it to the url of the job post
  data.map((job) => {
    job.batch = getBatch(job.title);
    job.title = removeBatchFromTitle(job.title);
    job.url = job.url
      ? job.url
      : `https://news.ycombinator.com/item?id=${job.id}`;
  });

  return {
    props: {
      data: data,
    },
    revalidate: 1,
  };
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const maxPostsRes = await fetch(
    "https://hacker-news.firebaseio.com/v0/maxitem.json"
  );

  const maxPosts = await maxPostsRes.json();

  const allJobs = [];

  // loop over maxPosts and add to allJobs array if type is job and start from maxPosts and stop when allJobs.length is 100
  for (let i = maxPosts; i > 0; i--) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${i}.json`;
    const jobRes = await fetch(url);
    const job = await jobRes.json();
    if (job.type === "job") {
      allJobs.push(job);
    }
    if (allJobs.length === 1) {
      break;
    }
  }

  res.status(200).json(allJobs);
}

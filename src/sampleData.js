export default {
  jobs: [
    {
      name: "Job 1"
    },
    {
      name: "Job 2",
      dependsOn: ["Job 1"],
      active: true
    },
    {
      name: "Job 3",
      dependsOn: ["Job 1"],
      status: "Failed",
      active: true
    },
    {
      name: "Job 4",
      dependsOn: ["Job 2", "Job 3"],
      status: "Succeeded"
    }, {
      name: "Job 5",
      dependsOn: ["Job 4"],
      active: true
    }
  ]
}

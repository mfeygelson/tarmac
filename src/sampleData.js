export default {
  jobs: [
    {
      name: "Job 1"
    },
    {
      name: "Job 2",
      active: true
    },
    {
      name: "Job 3",
      status: "Failed",
      active: true
    },
    {
      name: "Job 4",
      status: "Succeeded"
    }, {
      name: "Job 5",
      active: true
    }
  ],
  dependencies: [
    {
      from: 1,
      to: 0
    }, {
      from: 2,
      to: 0
    }, {
      from: 3,
      to: 1
    }, {
      from: 3,
      to: 2
    }, {
      from: 4,
      to: 3
    }
  ]
}

import renderJobs from "./renderJobs"
import sampleData from "./sampleData"

describe("render jobs", () => {
  let rendered
  beforeEach(() => {
    rendered = renderJobs(sampleData);
  })

  it("should draw a box for each job", () => {
    const {boxes} = rendered

    expect(boxes.some(box => box.name === "Job 1")).toBe(true)
    expect(boxes.some(box => box.name === "Job 2")).toBe(true)
    expect(boxes.some(box => box.name === "Job 3")).toBe(true)
    expect(boxes.some(box => box.name === "Job 4")).toBe(true)
  })

  it("should draw non-overlapping boxes", () => {
    const {boxes} = rendered

    boxes.forEach(box => {
      boxes.filter(other => other !== box).forEach(other => {
        const overlap = ([x11, x12], [x21, x22]) =>
          x21 <= x11 && x11 <= x22 ||
          x21 <= x12 && x12 <= x22 ||
          x11 <= x21 && x21 <= x12 ||
          x11 <= x22 && x22 <= x12

        expect(overlap([box.x, box.x + box.width], [other.x, other.x + other.width]) &&
               overlap([box.y, box.y + box.height], [other.y, other.y + other.height])).toBe(false)
      })
    })
  })

  it("should draw boxes within the bounds", () => {
    const {boxes} = rendered, width = 1000, height = 1000

    boxes.forEach(box => {
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.x + box.width).toBeLessThanOrEqual(width)
      expect(box.y).toBeGreaterThanOrEqual(0)
      expect(box.y + box.height).toBeLessThanOrEqual(height)
    })
  })

  it("should draw reasonably sized boxes", () => {
    const {boxes} = rendered, width = 1000, height = 1000

    boxes.forEach(box => {
      expect(box.width).toBeGreaterThanOrEqual(width / 20)
      expect(box.width).toBeLessThanOrEqual(width / 2)
      expect(box.height).toBeGreaterThanOrEqual(height / 50)
      expect(box.height).toBeLessThanOrEqual(height)
    })
  })

  for (const [fromJob, toJob] of [["Job 1", "Job 2"], ["Job 1", "Job 3"], ["Job 2", "Job 4"]]) {
    it(`should draw an arrow from the edge of ${fromJob} to the edge of ${toJob}`, () => {
      const {boxes, arrows} = rendered

      const job1 = boxes.find(box => box.name === fromJob)
      const job2 = boxes.find(box => box.name === toJob)

      const isOn = (point, box) =>
        (point.x === box.x || point.x === box.x + box.width) &&
        box.y <= point.y && point.y <= box.y + box.height ||
        (point.y === box.y || point.y === box.y + box.height) &&
        box.x <= point.x && point.x <= box.x + box.width

      expect(arrows.some(arrow => isOn(arrow.from, job1) && isOn(arrow.to, job2))).toBe(true)
    })
  }

  it("should draw Job 3 in red", () => {
    const {boxes} = rendered

    const box = boxes.find(box => box.name === "Job 3")

    expect(box.color).toBe("red")
  })

  it("should draw Job 4 in green", () => {
    const {boxes} = rendered

    const box = boxes.find(box => box.name === "Job 4")

    expect(box.color).toBe("green")
  })

  for (const job of ["Job 1", "Job 2"]) it(`should draw ${job} in gray`, () => {
    const {boxes} = rendered

    const box = boxes.find(box => box.name === job)

    expect(box.color).toBe("gray")
  })

  it("should mark Job 2 as active", () => {
    const {boxes} = rendered

    const box = boxes.find(box => box.name === "Job 2")

    expect(box.active).toBe(true)
  })
})

import { strict as assert } from "assert";

type GroupAssociation = { enrollmentId: number; studentId: string; groupId: number };

export const findEnrollmentInformation: () => unknown = function () {
  const courseInfoById = new Map<string, { groups: { id: number }[] }>();
  const groupAssociations: GroupAssociation[] = [];
  const enrollmentRows: { id: number; studentId: string; courseId: string }[] = [];

  return enrollmentRows.map(
    function ({ id, studentId, courseId }) {
      let groupChoice: number | undefined;
      const groupAssociation = groupAssociations.find(a => a.enrollmentId === id);
      if (groupAssociation) {
        const courseInfo = courseInfoById.get(courseId);
        assert(courseInfo !== undefined, `Expected course ${courseId}, which student ${studentId} is enrolled in, to be present`);

        const { groupId } = groupAssociation;
        const group = courseInfo.groups.find(g => g.id === groupId);
        if (group === undefined) {
          console.warn(`Enrollment ${id} has group ${groupId} for student ${studentId}, but such group does not exist under course ${courseId}`);
          groupChoice = -1;
        } else {
          groupChoice = group.id;
        }
      }
      return { studentId, courseId, groupChoice };
    }
  );
};

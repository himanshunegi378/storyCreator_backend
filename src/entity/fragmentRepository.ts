import { AbstractRepository, EntityRepository } from "typeorm";
import { Fragment } from "./Fragment";
import { Section } from "./Section";

@EntityRepository()
export class FragmentRespository extends AbstractRepository<Fragment> {
  async createfragment(sectionId: string, text: string) {
    const section = await this.manager.findOne(Section, {
      where: { id: sectionId },
    });
    if (!section) return;
    const newFragment = this.manager.create(Fragment, {
      like: 0,
      text: text,
      section: section,
    });
    return this.manager.save(newFragment);
  }
  async getAllFragmentsInSection(sectionId: string) {
    const fragments = await this.manager.find(Fragment, {
      where: { section: sectionId },
    });
    return fragments;
  }
}

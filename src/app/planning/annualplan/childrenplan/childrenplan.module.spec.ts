import { ChildrenplanModule } from './childrenplan.module';

describe('ChildrenplanModule', () => {
  let childrenplanModule: ChildrenplanModule;

  beforeEach(() => {
    childrenplanModule = new ChildrenplanModule();
  });

  it('should create an instance', () => {
    expect(childrenplanModule).toBeTruthy();
  });
});

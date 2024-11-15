import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from 'src/Entity/member.entity';
import { CreateMemberDto } from 'src/dto/create-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async createMember(createMemberDto: CreateMemberDto): Promise<Member> {
    const newMember = await this.memberRepository.create({
      memberid: createMemberDto.memberid,
      membername: createMemberDto.membername,
      email: createMemberDto.email,
      phone: createMemberDto.phone,
      isActive: true,
    });
    return await this.memberRepository.save(newMember);
  }

  async getAllMembers(): Promise<Member[]> {
    const memberData = await this.memberRepository.find();
    if (!memberData || memberData.length == 0) {
      throw new NotFoundException(`Members data not found!`);
    }
    return memberData;
  }
  async getMember(id: number): Promise<Member> {
    const existingMember = await this.memberRepository.findOneBy({ id });
    if (!existingMember) {
      throw new NotFoundException(`Member #${id} not found`);
    }
    return existingMember;
  }

  async editMember(memberid: string): Promise<Member> {
    const addmember = await this.memberRepository.findOneBy({ memberid });
    if (!addmember) {
      throw new NotFoundException(`Book #${memberid} not found`);
    }
    return addmember;
  }

  async updateMember(
    id: number,
    createMemberDto: CreateMemberDto,
  ): Promise<Member> {
    const existingMember = await this.memberRepository.findOneBy({ id });
    if (!existingMember) {
      throw new NotFoundException(`Member #${id} not found`);
    }
    const updatedMember = await this.memberRepository.update(
      id,
      createMemberDto,
    );
    return existingMember;
  }

  async deleteMember(id: number): Promise<Member> {
    const desiredMember = await this.memberRepository.findOneBy({ id });
    const deletedMember = await this.memberRepository.delete(desiredMember);
    if (!deletedMember) {
      throw new NotFoundException(`Member #${id} not found`);
    }
    return desiredMember;
  }
}

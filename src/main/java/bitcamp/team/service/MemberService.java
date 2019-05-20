package bitcamp.team.service;

import java.util.List;
import bitcamp.team.domain.Member;

public interface MemberService {
  List<Member> list();
  int add(Member member);
  Member get(int no);
  Member get(String email, String password);
  int getNo(String nickName);
  int getEmail(String email);
  int update(Member member);
  int delete(int no);
  int delete(String email);
  int size();
}

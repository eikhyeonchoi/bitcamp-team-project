package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Manufacturer;

public interface ManufacturerDao {
  int insert(Manufacturer member);
  int insertCompany(Manufacturer member);
  List<Manufacturer> findAll();
  List<Manufacturer> findAllUseProductAdd();
  List<Manufacturer> findByKeyword(String keyword);
  Manufacturer findByNo(int no);
  Manufacturer findByMemberNo(int no);
  int delete(int no);
  int update(Manufacturer manufacturer);
}

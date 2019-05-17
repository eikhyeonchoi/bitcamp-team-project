package bitcamp.team.dao;

import java.util.List;
import bitcamp.team.domain.Review;

public interface ReviewDao {
  List<Review> findAll();
  List<Review> findByNo(int no);
  Review findByNo2(int no);
  
  int delete(int no);
  int update(Review review);
}
package com.citybus.repository;

import com.citybus.model.RewardHistory;
import com.citybus.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RewardRepository extends JpaRepository<RewardHistory, Long> {

    List<RewardHistory> findByUser(User user);

}

package com.example.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.CorrectionStep
import com.example.ui.theme.BorderLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextMuted
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

/**
 * Horizontal timeline for the Home screen card "Sua última redação".
 */
@Composable
fun HorizontalStepper(
  currentStep: CorrectionStep = CorrectionStep.PROFESSOR,
  modifier: Modifier = Modifier
) {
  val steps = listOf("Enviada", "IA", "Professor", "Pronta")

  Column(modifier = modifier.fillMaxWidth()) {
    // Stepper dots and connector lines
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(horizontal = 14.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      // 1. Enviada (Completed)
      StepDot(state = StepDotState.COMPLETED)

      StepLine(isCompleted = true, modifier = Modifier.weight(1f))

      // 2. IA (Completed)
      StepDot(state = StepDotState.COMPLETED)

      StepLine(
        isCompleted = currentStep == CorrectionStep.PROFESSOR || currentStep == CorrectionStep.PRONTA,
        modifier = Modifier.weight(1f)
      )

      // 3. Professor (In progress)
      StepDot(
        state = if (currentStep == CorrectionStep.PRONTA) StepDotState.COMPLETED else StepDotState.IN_PROGRESS
      )

      StepLine(
        isCompleted = currentStep == CorrectionStep.PRONTA,
        modifier = Modifier.weight(1f)
      )

      // 4. Pronta (Pending)
      StepDot(
        state = if (currentStep == CorrectionStep.PRONTA) StepDotState.COMPLETED else StepDotState.PENDING
      )
    }

    Spacer(modifier = Modifier.height(8.dp))

    // Labels
    Row(
      modifier = Modifier.fillMaxWidth(),
      horizontalArrangement = Arrangement.SpaceBetween
    ) {
      steps.forEachIndexed { index, title ->
        val isCompletedOrCurrent = when (index) {
          0, 1 -> true
          2 -> currentStep == CorrectionStep.PROFESSOR || currentStep == CorrectionStep.PRONTA
          else -> currentStep == CorrectionStep.PRONTA
        }
        Text(
          text = title,
          fontSize = 12.sp,
          color = if (isCompletedOrCurrent) TextPrimary else TextMuted,
          fontWeight = if (isCompletedOrCurrent) FontWeight.Medium else FontWeight.Normal
        )
      }
    }
  }
}

enum class StepDotState {
  COMPLETED,
  IN_PROGRESS,
  PENDING
}

@Composable
private fun StepDot(state: StepDotState) {
  when (state) {
    StepDotState.COMPLETED -> {
      Box(
        modifier = Modifier
          .size(16.dp)
          .clip(CircleShape)
          .background(PinkPrimary)
      )
    }
    StepDotState.IN_PROGRESS -> {
      Box(
        modifier = Modifier
          .size(16.dp)
          .clip(CircleShape)
          .border(2.5.dp, PinkPrimary, CircleShape)
          .background(Color.White)
      )
    }
    StepDotState.PENDING -> {
      Box(
        modifier = Modifier
          .size(16.dp)
          .clip(CircleShape)
          .background(BorderLight)
      )
    }
  }
}

@Composable
private fun StepLine(isCompleted: Boolean, modifier: Modifier = Modifier) {
  Box(
    modifier = modifier
      .height(2.dp)
      .background(if (isCompleted) PinkPrimary else BorderLight)
  )
}

/**
 * Vertical detailed stepper for "Status da correção" screen.
 */
@Composable
fun VerticalCorrectionStepper(
  currentStep: CorrectionStep = CorrectionStep.PROFESSOR,
  modifier: Modifier = Modifier
) {
  Column(modifier = modifier.fillMaxWidth()) {
    // Step 1: Enviada
    VerticalStepItem(
      title = "Enviada",
      subtitle = "09:12 · recebemos seu texto",
      state = StepDotState.COMPLETED,
      isLast = false
    )

    // Step 2: Pré-correção da IA
    VerticalStepItem(
      title = "Pré-correção da IA",
      subtitle = "09:13 · estimativa disponível",
      state = StepDotState.COMPLETED,
      isLast = false
    )

    // Step 3: Revisão do professor
    VerticalStepItem(
      title = "Revisão do professor",
      subtitle = "Em andamento · prazo de até 3 dias",
      state = if (currentStep == CorrectionStep.PRONTA) StepDotState.COMPLETED else StepDotState.IN_PROGRESS,
      isHighlightedTitle = true,
      isLast = false
    )

    // Step 4: Correção oficial
    VerticalStepItem(
      title = "Correção oficial",
      subtitle = "Você será avisado quando estiver pronta",
      state = if (currentStep == CorrectionStep.PRONTA) StepDotState.COMPLETED else StepDotState.PENDING,
      isLast = true
    )
  }
}

@Composable
private fun VerticalStepItem(
  title: String,
  subtitle: String,
  state: StepDotState,
  isHighlightedTitle: Boolean = false,
  isLast: Boolean = false
) {
  Row(modifier = Modifier.fillMaxWidth()) {
    Column(
      horizontalAlignment = Alignment.CenterHorizontally,
      modifier = Modifier.width(36.dp)
    ) {
      when (state) {
        StepDotState.COMPLETED -> {
          Box(
            modifier = Modifier
              .size(24.dp)
              .clip(CircleShape)
              .background(PinkPrimary),
            contentAlignment = Alignment.Center
          ) {
            Icon(
              imageVector = Icons.Default.Check,
              contentDescription = "Concluído",
              tint = Color.White,
              modifier = Modifier.size(16.dp)
            )
          }
        }
        StepDotState.IN_PROGRESS -> {
          Box(
            modifier = Modifier
              .size(24.dp)
              .clip(CircleShape)
              .border(3.dp, PinkPrimary, CircleShape)
              .background(Color.White)
          )
        }
        StepDotState.PENDING -> {
          Box(
            modifier = Modifier
              .size(24.dp)
              .clip(CircleShape)
              .background(BorderLight)
          )
        }
      }

      if (!isLast) {
        Box(
          modifier = Modifier
            .width(2.dp)
            .height(44.dp)
            .background(if (state == StepDotState.COMPLETED) PinkPrimary else BorderLight)
        )
      }
    }

    Spacer(modifier = Modifier.width(12.dp))

    Column(
      modifier = Modifier
        .fillMaxWidth()
        .padding(bottom = if (isLast) 0.dp else 24.dp)
    ) {
      Text(
        text = title,
        fontSize = 16.sp,
        fontWeight = FontWeight.Bold,
        color = if (isHighlightedTitle) PinkPrimary else TextPrimary
      )
      Spacer(modifier = Modifier.height(2.dp))
      Text(
        text = subtitle,
        fontSize = 13.sp,
        color = TextSecondary
      )
    }
  }
}

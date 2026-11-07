package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.outlined.ArrowBack
import androidx.compose.material.icons.outlined.Info
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.data.model.EssayEvaluation
import com.example.ui.components.VerticalCorrectionStepper
import com.example.ui.theme.BorderLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun StatusCorrecaoScreen(
  evaluation: EssayEvaluation,
  onBack: () -> Unit,
  onViewPreCorrecao: () -> Unit,
  modifier: Modifier = Modifier
) {
  val scrollState = rememberScrollState()

  Column(
    modifier = modifier
      .fillMaxSize()
      .background(Color(0xFFF9FAFC))
      .statusBarsPadding()
      .navigationBarsPadding()
      .verticalScroll(scrollState)
      .padding(horizontal = 20.dp)
      .padding(top = 10.dp, bottom = 24.dp)
  ) {
    // Top Bar
    Row(
      modifier = Modifier
        .fillMaxWidth()
        .padding(bottom = 16.dp),
      verticalAlignment = Alignment.CenterVertically
    ) {
      IconButton(
        onClick = onBack,
        modifier = Modifier
          .size(40.dp)
          .testTag("status_correcao_back")
      ) {
        Icon(
          imageVector = Icons.AutoMirrored.Outlined.ArrowBack,
          contentDescription = "Voltar",
          tint = TextPrimary
        )
      }
      Spacer(modifier = Modifier.width(8.dp))
      Text(
        text = "Status da correção",
        color = TextPrimary,
        fontSize = 19.sp,
        fontWeight = FontWeight.Bold
      )
    }

    // Redação Header Card
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
      shadowElevation = 1.dp
    ) {
      Column(modifier = Modifier.padding(20.dp)) {
        Text(
          text = "Redação enviada",
          color = PinkPrimary,
          fontSize = 13.sp,
          fontWeight = FontWeight.SemiBold
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
          text = evaluation.theme,
          color = TextPrimary,
          fontSize = 18.sp,
          fontWeight = FontWeight.Bold,
          lineHeight = 24.sp
        )
        Spacer(modifier = Modifier.height(6.dp))
        Text(
          text = evaluation.submissionTime,
          color = TextSecondary,
          fontSize = 13.sp
        )
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Vertical Timeline Stepper Card
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(20.dp),
      color = Color.White,
      border = androidx.compose.foundation.BorderStroke(1.dp, BorderLight),
      shadowElevation = 1.dp
    ) {
      Box(modifier = Modifier.padding(20.dp)) {
        VerticalCorrectionStepper(currentStep = evaluation.currentStep)
      }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Disclaimer Info Card
    Surface(
      modifier = Modifier.fillMaxWidth(),
      shape = RoundedCornerShape(16.dp),
      color = Color(0xFFFFF0F5)
    ) {
      Row(
        modifier = Modifier.padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
      ) {
        Box(
          modifier = Modifier
            .size(24.dp)
            .clip(CircleShape)
            .background(PinkPrimary.copy(alpha = 0.15f)),
          contentAlignment = Alignment.Center
        ) {
          Icon(
            imageVector = Icons.Outlined.Info,
            contentDescription = "Informação",
            tint = PinkPrimary,
            modifier = Modifier.size(16.dp)
          )
        }

        Spacer(modifier = Modifier.width(12.dp))

        Text(
          text = "A pré-correção é uma estimativa feita por IA. A nota oficial é a do seu professor.",
          fontSize = 13.sp,
          color = TextPrimary,
          lineHeight = 18.sp
        )
      }
    }

    Spacer(modifier = Modifier.weight(1f, fill = false))
    Spacer(modifier = Modifier.height(28.dp))

    // Button: "Ver pré-correção"
    Button(
      onClick = onViewPreCorrecao,
      modifier = Modifier
        .fillMaxWidth()
        .height(54.dp)
        .testTag("btn_ver_pre_correcao"),
      shape = RoundedCornerShape(27.dp),
      colors = ButtonDefaults.buttonColors(
        containerColor = PinkPrimary,
        contentColor = Color.White
      )
    ) {
      Text(
        text = "Ver pré-correção",
        fontSize = 16.sp,
        fontWeight = FontWeight.SemiBold
      )
    }
  }
}
